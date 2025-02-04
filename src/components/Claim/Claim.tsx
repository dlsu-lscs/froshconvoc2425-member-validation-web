import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export const Claim = () => {
  const URLLINK = "http://member-validation.app.dlsu-lscs.org";
  const URLLINK2 = "http://tomo-scanner.app.dlsu-lscs.org";
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${URLLINK2}/status?studentId=${cookies.currentUser?.member_details?.id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setCookie("currentUser", response.data, { path: "/", maxAge: 60 });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data?.message || "An error occurred");
      } else {
        console.error(error);
      }
    }
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        `${URLLINK}/claim`,
        { studentId: Number(cookies.currentUser?.member_details?.id) },
        { headers: { "Content-Type": "application/json" } }
      );

      const message = response.data.message;
      const fullName = cookies.currentUser?.member_details?.full_name;
      const toastMessage = message.includes("already claimed")
        ? `${fullName} has already claimed the Promo`
        : `${fullName} has claimed the Promo`;

      if (!message.includes("already claimed")) {
        toast({
          title: toastMessage,
          className: "text-white bg-black rounded-lg border-2",
        });
        fetchData();
      } else {
        toast({
          title: toastMessage,
          className: "text-white bg-black rounded-lg border-2",
        });
        fetchData();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: error.response?.data?.message || "Request failed",
          className: "text-white bg-black rounded-lg border-2",
        });
      }
      console.error(error);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={postData}
      className="text-white bg-black"
    >
      Claim Coffee
    </Button>
  );
};

export default Claim;
