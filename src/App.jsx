import Cart from './components/Cart/Cart.jsx';
import Header from './components/Layouts/Header.jsx';
import Meals from './components/Meals/Meals.jsx';

const App = () => {
  return (
    <>
      <Cart />
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
