import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useGetAllBrandsQuery } from "@/entities/brand";
import { useCreateSsdMutation } from "@/entities/ssd";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

import { CreateSsdSchema } from "../model/create-ssd-schema";

const CreateSsdForm: FC = () => {
  const [createSsd, { isError, error }] = useCreateSsdMutation();
  const { data: brands } = useGetAllBrandsQuery();

  const form = useForm({
    resolver: zodResolver(CreateSsdSchema),
    defaultValues: {
      model: "",
      manufacturerCode: "",
      brandId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateSsdSchema>) => {
    await createSsd(values);

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-7"
      >
        <FormField
          control={form.control}
          name={"model"}
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  {...field}
                  placeholder="unique ssd model"
                  type="text"
                  className="relative"
                />
              </FormControl>
              <FormMessage className="absolute bottom-0 left-0 right-0 top-10 text-start" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"manufacturerCode"}
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  {...field}
                  placeholder="unique ssd manufacturer code"
                  type="text"
                  className="relative"
                />
              </FormControl>
              <FormMessage className="absolute bottom-0 left-0 right-0 top-10 text-start" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brandId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? brands?.find((brand) => brand.id === field.value)
                            ?.name
                        : "select brand"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="search..." />
                    <CommandEmpty>not found</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {brands?.map((brand) => (
                          <CommandItem
                            value={brand.name}
                            key={brand.id}
                            onSelect={() => {
                              form.setValue("brandId", brand.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                brand.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {brand.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {isError && (
          <div className="rounded-md border-[1px] border-neutral-500 bg-red-500 px-5 py-3 text-center">
            <span className="text-neutral-100">
              {/*@ts-ignore*/}
              <span className="text-neutral-100">{error.data.message}</span>
            </span>
          </div>
        )}

        <Button variant="outline" type="submit">
          create
        </Button>
      </form>
    </Form>
  );
};

CreateSsdForm.displayName = "create-ssd-form";

export { CreateSsdForm };
