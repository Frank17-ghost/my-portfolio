function ProductCard({ name, price }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold">{name}</h2>
      <p className="text-gray-500">${price}</p>
    </div>
  );
}

export default ProductCard;