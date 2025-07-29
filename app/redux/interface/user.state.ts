interface UserProfile {
  id: number;
  name:string
  email: string;
  gender: string;
  favourite:[];
}
interface UserState {
  loading: boolean;
  error: string | null;
  profile: UserProfile | null;
}
