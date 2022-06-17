import { useState } from 'react'
import {connect} from 'react-redux'
import { login } from '../redux/reducer'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Login({login, isLoginPending, isLoginSuccess, loginError}) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')


const	loginUser1 = (event) =>{
	event.preventDefault();
	login(username, password)

	} 


	return (
		
<div className="auth-layout-wrap " 
style={{
	backgroundImage: 'url(/images/sear.jpg)',
      }}>
		<div>
              <div className="p-4  border">
		 <span >
		 <h3 className='ph'>Login:</h3>
		 <div className='icon'><i class="fas fa-key fa-3x  key" /></div>
		   </span>
		   <div >
		   <form onSubmit={loginUser1}>
			 <div   >
				 <div class="form-group" >
				   <div><label className='ph'>Username</label></div>
				   <input class="form-control size"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									type="string"
									placeholder="username"
									required
										/>
				 </div>
				 <div class="form-group" >
				   <div><label for="password" className='ph'>Password</label></div>
				   <input  class="form-control size"
					value={password}
					onChange={(e) =>setPassword(e.target.value)}
					type="string"
					placeholder="Password"
					required
				/>
				   </div>
				   {username && password ?  <div><input type="submit" class="btn btn-outline-primary ph" value="Login"  /></div>
				   : <div><input type="submit" class="btn btn-outline-primary" value="Login"  disabled /></div>}
				 <br></br>
				 { isLoginPending ? <div className='ph1'> <Box sx={{ display: 'flex' }}>
    				  <CircularProgress />
  					  </Box></div>: null } 
				{ isLoginSuccess ? <div className='ph1'>Your Welcome</div>: null } 
				{ loginError ? <div className='ph1'>Check your username and password !!</div>: null} 
		  </div>
		
		  </form>
	   </div>
	  </div>
	   </div>
</div>	   

	)
}

const mapStateProps =(state) => {
	return {
		isLoginPending: state.isLoginPending,
		isLoginSuccess: state.isLoginSuccess,
		loginError: state.loginError,
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		login: (username, password) => dispatch(login(username, password))
	}
}
export default connect(mapStateProps, mapDispatchToProps)(Login)
