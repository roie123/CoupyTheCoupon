interface SuccesfulLoginProps{
userName:string
}
    /**
     * Author - Roie Ivri
     * Created Date&Time - 01/06/2023 | 17:07
     */
export default function SuccesfulLogin(props:SuccesfulLoginProps){

return(
<>
    <div className="logged-in-welcome" id={'logged-in-welcome'}>
        <p className={'user-name-welcome'} > Welcome {props.userName}</p>
        <div className="night">
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
        </div>
    </div>
</>
)
}