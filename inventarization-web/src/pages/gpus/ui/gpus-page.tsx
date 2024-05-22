import { FC } from "react";

import { useDeleteGpuMutation, useGetAllGpusQuery } from "@/entities/gpu";
import { createColumns } from "@/pages/gpus/lib/columns.tsx";
import { CreateGpuForm } from "@/pages/gpus/ui/create-gpu-form.tsx";
import { Alert, AlertTitle } from "@/shared/ui/alert";
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

const GpusPage: FC = () => {
  const { data, isSuccess } = useGetAllGpusQuery();
  const [deleteGpu] = useDeleteGpuMutation();

  const columns = createColumns(deleteGpu);

  return (
    <Container>
      <div className="py-3">
        <div className="flex flex-col items-center justify-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                create gpu
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">create gpu</DialogTitle>
              </DialogHeader>
              <CreateGpuForm />
            </DialogContent>
          </Dialog>

          {isSuccess ? (
            data?.length ? (
              <DataTable field="model" columns={columns} data={data} />
            ) : (
              <Alert>
                <AlertTitle>gpus dont exits yet 😭</AlertTitle>
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

GpusPage.displayName = "gpus-page";

export default GpusPage;
