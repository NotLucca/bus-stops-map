import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/map";
export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC0EFN0lTNWw6Q0l8EzdPKtrLtdtTBYPqo",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}