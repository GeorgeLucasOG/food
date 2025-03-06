"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useTransition } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
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
};

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext);
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

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
        deliveryOption: z.enum(["euLevo", "delivery"]),
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
      }),
    ),
    defaultValues: {
      name: "",
      cpf: "",
      deliveryOption: "euLevo",
      address: "",
      whatsapp: "",
    },
    shouldUnregister: true,
  });

  const isDelivery = form.watch("deliveryOption") === "delivery";

  // Adicionar validação dinâmica com base em isDelivery
  React.useEffect(() => {
    if (isDelivery) {
      // Se Delivery está selecionado, tornar os campos obrigatórios
      form.register("address", {
        required: "O endereço é obrigatório quando Delivery é selecionado.",
      });
      form.register("whatsapp", {
        required:
          "O WhatsApp/Celular é obrigatório quando Delivery é selecionado.",
      });
    } else {
      // Se não está selecionado, remover a validação
      form.unregister("address");
      form.unregister("whatsapp");
    }
  }, [isDelivery, form]);

  const onSubmit = async (data: FormSchema) => {
    try {
      const consumptionMethod = searchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;
      startTransition(async () => {
        await createOrder({
          consumptionMethod,
          customerCpf: data.cpf,
          customerName: data.name,
          products,
          slug,
          ...(data.deliveryOption === "delivery" && {
            address: data.address,
            whatsapp: data.whatsapp,
          }),
        });
        onOpenChange(false);
        toast.success("Pedido finalizado com sucesso!");
      });
    } catch (error) {
      console.error(error);
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
              {isDelivery && (
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
              {isDelivery && (
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
                  disabled={isPending}
                >
                  {isPending && <Loader2Icon className="animate-spin" />}
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
