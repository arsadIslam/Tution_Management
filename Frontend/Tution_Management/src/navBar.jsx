const NavBar = () => {
    return (<div style= {{backgroundColor:"grey",display:"flex",justifyContent:"space-evenly",height:"70px",alignItems:"center"}}> 
    <div style={{fontWeight:"bold"}}>Tution Pay</div>
    <div>Home</div>
    <div style={{fontSize:"16px"}}><button style={{border:"none",backgroundColor:"grey",marginRight:"3px"}}>Sign In</button>
    <button style={{padding:"8px 18px", backgroundColor:"#6366F1",borderRadius:"9px", border:"none",fontWeight:"530"}}>Get Started</button></div> </div> );
}
export default NavBar;