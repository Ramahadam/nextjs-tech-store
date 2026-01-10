import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredntials } from "../authSlice";
import { useSyncUserMutation } from "@/features/api/apiSlice";
import { setProfile } from "@/features/user/userSlice";

export function useAuthFlow() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [syncUser] = useSyncUserMutation();

  const updateAuthUIAndRedirect = async ({
    token,
    fullname,
    redirectTo,
  }: {
    token: string;
    fullname?: string | null;
    redirectTo?: string | null;
  }) => {
    // 1. Create session (httpOnly cookie)
    await fetch("/api/session", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 2. Store token in redux
    dispatch(setCredntials(token));

    // 3. Sync user with backend
    const res = await syncUser({
      token,
      profile: fullname ? { fullname } : undefined,
    }).unwrap();

    const profile = res.user;
    if (!profile) return;

    // 4. Store profile
    dispatch(setProfile(profile));

    // 5. Redirect
    if (redirectTo) router.replace(redirectTo);
    else router.push("/");
  };

  return { updateAuthUIAndRedirect };
}
