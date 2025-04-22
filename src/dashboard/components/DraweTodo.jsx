import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Select,
  Input,
  SelectItem,
  Form,
} from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CircleDot } from "lucide-react";
import { UpdateTodo } from "../service/todo.service";
export default function DrawerTodo({ todo = {}, isOpen, onOpenChange }) {
  const status = [
    { key: "pending", label: "pending" },
    { key: "completed", label: "completed" },
  ];
  const [value, setValue] = useState("");

  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const [good, setGood] = useState(false);
  const onSubmit = async (data) => {
    const request = await UpdateTodo({
      id: todo._id,
      name: data.todo,
      status: value,
    });
    if (!request) {
      setGood(true);
      setMessage("Error al hacer la peticion");
      return;
    }

    setGood(true);
    setMessage("Actualizado");
    setTimeout(() => {
      location.reload();
    }, 500);
  };
  return (
    <>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">
                  Update Todo
                </DrawerHeader>
                <DrawerBody>
                  <Input
                    isInvalid={good}
                    errorMessage={message}
                    label="Todo Name"
                    placeholder={todo.name}
                    variant="bordered"
                    {...register("todo")}
                  />
                  <Select
                    className="max-w-xs"
                    label="Select an status"
                    size="lg"
                    placeholder={todo.status}
                    startContent={<CircleDot />}
                    onChange={handleSelectionChange}
                    selectedKeys={[value]}
                  >
                    {status.map((sta) => (
                      <SelectItem key={sta.key}>{sta.label}</SelectItem>
                    ))}
                  </Select>
                  <p className="text-small text-default-500">
                    Selected: {value}
                  </p>
                </DrawerBody>
                <DrawerFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="success" type="submit">
                    Update
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Form>
      </Drawer>
    </>
  );
}
