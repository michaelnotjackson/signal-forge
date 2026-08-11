import { VStack, Button } from "@astryxdesign/core";

export function meta() {
  return [
    { title: "Test React Router with Astryx" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <VStack>
      <Button label="Le Button" onClick={async () => await bindings.ping()}/>
    </VStack>
  );
}
