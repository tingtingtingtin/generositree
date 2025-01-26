import Form from "@/components/Form";
import Header from "@/components/Header";

export default function PlantTreePage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex h-full items-center justify-center bg-green-100 p-6">
        <Form />
      </div>
    </div>
  );
}
