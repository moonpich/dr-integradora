import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Image,
  Form,
} from "@heroui/react";
import React, { useEffect } from "react";
import { TodoItem } from "../components/TodoItem";
import { ListTodo } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";
import { FindAll, SaveTodo } from "../service/todo.service";
import { API_PATH } from "../../config";
import { useForm } from "react-hook-form";
function ToDos() {
  const [todos, setTodos] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState();
  const [previewUrl, setPreviewUrl] = React.useState("");
  const navigate = useNavigate();
  const { credentials, setCredentials, logout } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    if (
      !credentials ||
      !credentials._id ||
      !credentials.username ||
      !credentials.email
    ) {
      const email = sessionStorage.getItem("email");
      const _id = sessionStorage.getItem("_id");
      if (!email || !_id) {
        navigate("/");
        return;
      }
      setCredentials({
        email,
        _id,
      });
    }

    const findAllTodos = async () => {
      const allTodos = await FindAll();
      setTodos(allTodos);
    };

    findAllTodos();
  }, [navigate]);
  if (!credentials) {
    return null;
  }
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleAddTodo = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image[0]);
    const save = await SaveTodo({ formData: formData });
    if (!save) {
      return;
    }
    setPreviewUrl("");
    reset();
    location.reload();
  };

  const handleToggle = async (id) => {
    try {
      const response = await fetch(`${API_PATH}/todos/status/${id}`, {
        method: "PATCH",
        credentials: "include",
      });

      const updatedTodo = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_PATH}/todos/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const updatedTodo = await response.json();
      console.log({ updatedTodo });

      location.reload();
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen bg-content1 p-8">
      <div className="absolute top-0 right-0">
        <Button variant="flat" color="danger" size="lg" onPress={logout}>
          Log out
        </Button>
      </div>
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="flex gap-3">
          <ListTodo className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <p className="text-xl font-bold">Todo List</p>
            <p className="text-small text-default-500">
              Organize your tasks with images
            </p>
          </div>
        </CardHeader>
        <CardBody className="gap-4">
          <Form></Form>
          <div className="flex flex-col gap-2">
            <Form onSubmit={handleSubmit(handleAddTodo)}>
              <Input placeholder="Add a new todo..." {...register("name")} />
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    {...register("image")}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    description="Select an image for your todo"
                  />
                </div>
                {previewUrl && (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                )}
              </div>
              <Button
                color="secondary"
                onPress={handleAddTodo}
                type="submit"
                className="w-full"
                isDisabled={!previewUrl}
              >
                Add Todo with Image
              </Button>
            </Form>
          </div>
          <div className="flex flex-col gap-3">
            {todos.length === 0 ? (
              <p className="text-center text-default-500">
                No tasks yet. Add your first todo!
              </p>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default ToDos;
