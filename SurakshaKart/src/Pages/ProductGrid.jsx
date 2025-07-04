import React from 'react'

const dummyProducts = [
  { id: 1, name: 'Smart Lock', price: '$129', rating: 4.5 },
  { id: 2, name: 'Security Camera', price: '$89', rating: 4.2 },
  { id: 3, name: 'GPS Tracker', price: '$59', rating: 4.1 },
  { id: 4, name: 'Fire Alarm', price: '$39', rating: 4.3 },
]

export default function ProductGrid() {
  return (
    <section className="product-grid">
      {dummyProducts.map(product => (
        <div key={product.id} className="product-card glass animate-pop-in">
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <p>⭐ {product.rating}</p>
          <button className="add-cart">Add to Cart</button>
        </div>
      ))}
    </section>
  )
}