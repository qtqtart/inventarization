import { FC } from "react";

import { useDeleteRamMutation, useGetAllRamsQuery } from "@/entities/ram";
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
import { Container } from "@/widgets/container/ui/container";

import { createColumns } from "../lib/columns";
import { CreateRamForm } from "./create-ram-form";

const RamsPage: FC = () => {
  const { data, isSuccess } = useGetAllRamsQuery();
  const [deleteRam] = useDeleteRamMutation();

  const columns = createColumns(deleteRam);

  return (
    <Container>
      <div className="py-3">
        <div className="flex flex-col items-center justify-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                create ram
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">create ram</DialogTitle>
              </DialogHeader>
              <CreateRamForm />
            </DialogContent>
          </Dialog>

          {isSuccess ? (
            data?.length ? (
              <DataTable field="model" columns={columns} data={data} />
            ) : (
              <Alert>
                <AlertTitle>rams dont exits yet 😭</AlertTitle>
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

RamsPage.displayName = "rams-page";

export default RamsPage;
