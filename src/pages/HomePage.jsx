import LoginForm from '../components/auth/LoginForm'


const HomePage = () => {
    
    return (
      <div className="bg-gray-100 bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/bg-image.jpg)' }}>
        <h1 className='text-center text-blue-900 text-7xl pt-5  font-serif'>WELCOME </h1>
        <h3 className='text-center text-blue-900 text-5xl pt-5  font-serif'>SCHOOL MANAGEMENT SYSTEM </h3>

        <div>
        <LoginForm/>
        </div>
      </div>
    );
  };
  
  export default HomePage;
  