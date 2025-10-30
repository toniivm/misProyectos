import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Asegúrate de que product.images exista y sea un array
  const image = product.images ? product.images[0] : 'https://placehold.co/800x800/222/FFF?text=Zapatilla'; 

  return (
    // La tarjeta es el enlace completo para un mejor clic y diseño limpio
    <Link to={`/product/${product.id}`} className="bg-white flex flex-col group block hover:shadow-lg transition duration-300">
      <div className="overflow-hidden">
        <img 
          src={image} 
          alt={product.title} 
          // Efecto hover sutil en la imagen
          className="w-full h-80 object-cover transition duration-500 group-hover:scale-[1.05]" 
        />
      </div>
      
      {/* Información del producto - Alineación limpia */}
      <div className="pt-4 pb-2 flex flex-col items-start">
          <h3 className="text-lg font-semibold tracking-wide">{product.title}</h3>
          <p className="text-md font-bold mt-1 mb-2">{product.price.toFixed(2)} €</p>
          
          {/* Botón de 'Ver Detalle' discreto, aparece en hover */}
          <span 
              className="mt-2 w-full text-center border border-black text-black py-2 text-sm font-medium 
              opacity-0 group-hover:opacity-100 transition duration-300 md:block hidden"
          >
              VER DETALLE
          </span>
      </div>
    </Link>
  );
};

export default ProductCard;
