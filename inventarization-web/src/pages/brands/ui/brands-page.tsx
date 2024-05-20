import { FC } from "react";

import { useDeleteBrandMutation, useGetAllBrandsQuery } from "@/entities/brand";
import { CreateBrandForm } from "@/pages/brands/ui/create-brand-form";
import { Alert, AlertTitle } from "@/shared/ui/alert.tsx";
import { Button } from "@/shared/ui/button";
import { DataTable } from "@/shared/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Container } from "@/widgets/container";

import { createColumns } from "../lib/columns.tsx";

const BrandsPage: FC = () => {
  const { data, isSuccess } = useGetAllBrandsQuery();
  const [deleteBrand] = useDeleteBrandMutation();

  const columns = createColumns(deleteBrand);

  return (
    <Container>
      <div className="py-3">
        <div className="flex flex-col items-center justify-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                create brand
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">create brand</DialogTitle>
              </DialogHeader>
              <CreateBrandForm />
            </DialogContent>
          </Dialog>

          {isSuccess ? (
            data?.length ? (
              <DataTable field="name" columns={columns} data={data} />
            ) : (
              <Alert>
                <AlertTitle>brands dont exits yet 😭</AlertTitle>
              </Alert>
            )
          ) : (
            <Alert>
              <AlertTitle>something went wrong 🤕</AlertTitle>
            </Alert>
          )}
        </div>
      </div>
    </Container>
  );
};

BrandsPage.displayName = "brands-page";

export default BrandsPage;
