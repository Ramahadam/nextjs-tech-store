import { useOnAuthStateChanged } from "@/lib/firebase/useOnAuthStateChanged";

export default function AuthInitializer() {
  useOnAuthStateChanged();

  return null;
}
