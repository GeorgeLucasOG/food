"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useState, useTransition } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createOrder } from "../actions/create-order";
import { CartContext } from "../contexts/cart";
import { isValidCpf } from "../helpers/cpf";
import { createStripeCheckout } from "../actions/create-stripe-checkout";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner';

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Função para aplicar máscara de telefone celular
const applyPhoneMask = (value: string): string => {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, "");

  // Aplica a máscara (00) 0 0000-0000
  if (numericValue.length <= 2) {
    return numericValue.replace(/(\d{1,2})/, "($1");
  } else if (numericValue.length <= 3) {
    return numericValue.replace(/(\d{2})(\d{1})/, "($1) $2");
  } else if (numericValue.length <= 7) {
    return numericValue.replace(/(\d{2})(\d{1})(\d{1,4})/, "($1) $2 $3");
  } else if (numericValue.length <= 11) {
    return numericValue.replace(
      /(\d{2})(\d{1})(\d{4})(\d{1,4})/,
      "($1) $2 $3-$4",
    );
  } else {
    // Limita a 11 dígitos (DDD + 9 dígitos)
    return numericValue
      .slice(0, 11)
      .replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
  }
};

// Tipo para o formulário
type FormSchema = {
  name: string;
  cpf: string;
  deliveryOption: "euLevo" | "delivery";
  address?: string;
  whatsapp?: string;
  tableNumber?: string; // Campo para número da mesa quando for DINE_IN
};

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Verifica se o método de consumo é DINE_IN (consumir no local)
  const consumptionMethod = searchParams.get(
    "consumptionMethod",
  ) as ConsumptionMethod;
  const isDineIn = consumptionMethod === "DINE_IN";

  const form = useForm<FormSchema>({
    resolver: zodResolver(
      z.object({
        name: z.string().trim().min(1, {
          message: "O nome é obrigatório.",
        }),
        cpf: z
          .string()
          .trim()
          .min(1, {
            message: "O CPF é obrigatório.",
          })
          .refine((value) => isValidCpf(value), {
            message: "CPF inválido.",
          }),
        // Só requer deliveryOption se não for DINE_IN
        deliveryOption: isDineIn
          ? z.enum(["euLevo", "delivery"]).optional()
          : z.enum(["euLevo", "delivery"]),
        address: z
          .string()
          .trim()
          .min(1, {
            message: "O endereço é obrigatório quando Delivery é selecionado.",
          })
          .optional(),
        whatsapp: z
          .string()
          .trim()
          .min(1, {
            message:
              "O WhatsApp/Celular é obrigatório quando Delivery é selecionado.",
          })
          .optional(),
        tableNumber: z
          .string()
          .trim()
          .min(1, {
            message:
              "O número da mesa é obrigatório quando DINE_IN é selecionado.",
          })
          .optional(),
      }),
    ),
    defaultValues: {
      name: "",
      cpf: "",
      deliveryOption: "euLevo",
      address: "",
      whatsapp: "",
      tableNumber: "",
    },
    shouldUnregister: true,
  });

  const isDelivery = form.watch("deliveryOption") === "delivery";

  React.useEffect(() => {
    // Se for DINE_IN, tornar o campo tableNumber obrigatório
    if (isDineIn) {
      form.register("tableNumber", {
        required: "O número da mesa é obrigatório para consumo no local.",
      });
    } else {
      form.unregister("tableNumber");
    }

    // Se NÃO for DINE_IN e Delivery estiver selecionado
    if (!isDineIn && isDelivery) {
      // Tornar os campos obrigatórios
      form.register("address", {
        required: "O endereço é obrigatório quando Delivery é selecionado.",
      });
      form.register("whatsapp", {
        required:
          "O WhatsApp/Celular é obrigatório quando Delivery é selecionado.",
      });
    } else {
      // Se for DINE_IN ou não for Delivery, remover a validação
      form.unregister("address");
      form.unregister("whatsapp");
    }
  }, [isDineIn, isDelivery, form]);

  const onSubmit = async (data: FormSchema) => {
    try {
      setIsLoading(true);
      const consumptionMethod = searchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;

      const order = await createOrder({
        consumptionMethod,
        customerCpf: data.cpf,
        customerName: data.name,
        products,
        slug,
        // Incluir tableNumber se for DINE_IN
        ...(isDineIn && {
          tableNumber: data.tableNumber,
        }),
        // Só envia address e whatsapp se não for DINE_IN e for delivery
        ...(!isDineIn &&
          data.deliveryOption === "delivery" && {
            address: data.address,
            whatsapp: data.whatsapp,
          }),
      });      

      const { sessionId } = await createStripeCheckout({
        products,
        orderId: order.id,
        slug,
        consumptionMethod,
        cpf: data.cpf,
      });
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) return;
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
      );
      stripe?.redirectToCheckout({
        sessionId: sessionId,
      });

      // onOpenChange(false);
      // toast.success("Pedido finalizado com sucesso!");
      
    } catch (error) {
      console.error(error);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar o seu pedido.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu CPF..."
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo de Mesa - apenas para DINE_IN */}
              {isDineIn && (
                <FormField
                  control={form.control}
                  name="tableNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número da Mesa</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o número da sua mesa..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Mostrar opções de entrega apenas se NÃO for DINE_IN */}
              {!isDineIn && (
                <FormField
                  control={form.control}
                  name="deliveryOption"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Método de Entrega
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <input
                            {...field}
                            id="euLevo"
                            type="radio"
                            value="euLevo"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            required
                          />
                          <label
                            htmlFor="euLevo"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Eu levo
                            <span
                              className="ml-1 text-gray-500"
                              title="Você irá buscar o pedido no local."
                            ></span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            {...field}
                            id="delivery"
                            type="radio"
                            value="delivery"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            required
                          />
                          <label
                            htmlFor="delivery"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Delivery
                            <span
                              className="ml-1 text-gray-500"
                              title="Nós entregaremos o pedido no seu endereço."
                            ></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                />
              )}
              {/* Campos de endereço e WhatsApp aparecem apenas se NÃO for DINE_IN e a opção for delivery */}
              {!isDineIn && isDelivery && (
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu endereço..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!isDineIn && isDelivery && (
                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp/Celular</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu WhatsApp ou celular..."
                          value={applyPhoneMask(field.value || "")}
                          onChange={(e) => {
                            // Precisamos extrair apenas os números para armazenar no formulário
                            const rawValue = e.target.value.replace(/\D/g, "");
                            field.onChange(rawValue);
                          }}
                          maxLength={16} // Comprimento máximo da string formatada (00) 0 0000-0000
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <DrawerFooter>
                <Button
                  type="submit"
                  variant="destructive"
                  className="rounded-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2Icon className="animate-spin" />}
                  Finalizar
                </Button>
                <DrawerClose asChild>
                  <Button className="w-full rounded-full" variant="outline">
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
