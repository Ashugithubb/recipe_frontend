import { useAppSelector } from "../redux/hook/hook"

export default function Favorite (){
    const fav = useAppSelector((state)=>state.user.profile?.favourite);
return(
    <>

    </>
)
}