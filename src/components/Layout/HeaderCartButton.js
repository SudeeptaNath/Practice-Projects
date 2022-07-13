import CartIcon from "../Cart/CartIcon.js";
import { useContext, useEffect , useState} from "react";
import CartContext from "../../Store/cart-context.js";
import classes from './HeaderCartButton.module.css'


const HeaderCartButton = props =>{
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCTX = useContext(CartContext);

    const noOfCartItems = cartCTX.items.reduce((curNumber, item)=>{
        return curNumber + item.amount
    }, 0);

    const {items} = cartCTX;
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect( () => {
        if(cartCTX.items.length === 0){
            return
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items, cartCTX.items.length]);

    return <button className={btnClasses} onClick={props.onClickCart}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {noOfCartItems}
        </span>
    </button>
    
}

export default HeaderCartButton;

