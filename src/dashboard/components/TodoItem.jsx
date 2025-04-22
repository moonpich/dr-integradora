import { Card, CardBody, Checkbox, Button } from "@heroui/react";
import { Trash2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import DrawerTodo from "./DraweTodo";

export const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [todoImage, setTodoImage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (todo.image?.data?.data) {
      const byteArray = new Uint8Array(todo.image.data.data);
      const blob = new Blob([byteArray], { type: todo.image.contentType });
      const url = URL.createObjectURL(blob);
      setTodoImage(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [todo.image]);
  return (
    <Card className="w-full" shadow="sm">
      <CardBody className="flex items-center gap-4">
        {todoImage ? (
          <img
            src={todoImage}
            alt={todo.name}
            className="h-16 w-16 rounded-lg object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-lg bg-gray-200" />
        )}
        <div className="flex flex-1 items-center justify-between">
          <Checkbox
            isSelected={todo.status === "pending" ? false : true}
            onValueChange={() => onToggle(todo._id)}
            lineThrough
            size="lg"
          >
            {todo.name}
          </Checkbox>

          <Button
            isIconOnly
            color="danger"
            variant="light"
            onPress={() => onDelete(todo._id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
          <Button
            isIconOnly
            color="primary"
            variant="light"
            onPress={() => setIsOpen(true)}
          >
            <Pencil className="h-5 w-5" />
          </Button>
        </div>
      </CardBody>
      <DrawerTodo todo={todo} onOpenChange={setIsOpen} isOpen={isOpen} />
    </Card>
  );
};
