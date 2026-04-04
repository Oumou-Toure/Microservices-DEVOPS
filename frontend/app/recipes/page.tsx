'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
}

interface Favorite {
  id: number
  mealId: string
  name: string
  thumbnail: string
  category: string
}

export default function RecipesPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Meal[]>([])
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState('')

  const loadFavorites = async () => {
    try {
      const res = await fetch('/api/recipes/favorites')
      if (res.ok) {
        const data = await res.json()
        setFavorites(data)
      }
    } catch {
      console.error('Erreur chargement favoris')
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  const searchRecipes = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setSearching(true)
    setError('')

    try {
      const res = await fetch(`/api/recipes/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.meals || [])
      if (!data.meals) setError('Aucune recette trouvée')
    } catch {
      setError('Erreur lors de la recherche')
    } finally {
      setSearching(false)
    }
  }

  const addFavorite = async (meal: Meal) => {
    try {
      const res = await fetch('/api/recipes/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mealId: meal.idMeal,
          name: meal.strMeal,
          thumbnail: meal.strMealThumb,
          category: meal.strCategory,
        }),
      })
      if (res.ok) loadFavorites()
      else alert('Déjà dans vos favoris ou erreur')
    } catch {
      alert('Erreur lors de l\'ajout')
    }
  }

  const deleteFavorite = async (id: number) => {
    if (!confirm('Supprimer ce favori ?')) return
    const res = await fetch(`/api/recipes/favorites/${id}`, { method: 'DELETE' })
    if (res.ok) loadFavorites()
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">🍽️ Mes Recettes</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline text-sm">
          ← Retour au dashboard
        </Link>
      </div>

      <form onSubmit={searchRecipes} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Rechercher une recette... (ex: chicken, pasta)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          disabled={searching}
          className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 disabled:opacity-50"
        >
          {searching ? 'Recherche...' : 'Rechercher'}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {results.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Résultats ({results.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((meal) => (
              <div key={meal.idMeal} className="border rounded-xl overflow-hidden shadow-sm">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <p className="font-medium text-sm text-gray-800 mb-1 line-clamp-2">
                    {meal.strMeal}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {meal.strCategory} • {meal.strArea}
                  </p>
                  <button
                    onClick={() => addFavorite(meal)}
                    className="w-full text-xs bg-orange-100 text-orange-700 rounded-lg py-1 hover:bg-orange-200"
                  >
                    ❤️ Ajouter aux favoris
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold mb-4">❤️ Mes favoris ({favorites.length})</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">Aucun favori pour le moment. Recherchez des recettes !</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.map((fav) => (
              <div key={fav.id} className="border rounded-xl overflow-hidden shadow-sm">
                <img
                  src={fav.thumbnail}
                  alt={fav.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <p className="font-medium text-sm text-gray-800 mb-1">{fav.name}</p>
                  <p className="text-xs text-gray-500 mb-2">{fav.category}</p>
                  <button
                    onClick={() => deleteFavorite(fav.id)}
                    className="w-full text-xs bg-red-100 text-red-600 rounded-lg py-1 hover:bg-red-200"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}