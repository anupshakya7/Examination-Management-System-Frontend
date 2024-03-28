import React from 'react'

const Login = () => {
    return (
        <div className='card p-3 text-start shadow w-50 m-auto'>
            <h2>Login</h2>
            <form>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder='Enter Email..' />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" placeholder='Enter Password..' />
                </div>
                <button type="submit" class="btn btn-primary shadow">Login</button>
            </form>
        </div>
    )
}

export default Login
