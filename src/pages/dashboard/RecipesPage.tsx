import { useState } from 'react'
import { Plus, Edit, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react'
import { recipes } from '../../data/products'

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null)

  const filteredRecipes = recipes.filter(recipe =>
    recipe.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">
            Recipe Management
          </h1>
          <p className="text-gray-500 dark:text-afri-cream-400">
            Manage product recipes and ingredients
          </p>
        </div>
        <button className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add Recipe
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-afri-earth-600 rounded-lg bg-white dark:bg-afri-earth-700 text-gray-900 dark:text-afri-cream-200"
        />
      </div>

      {/* Recipe Cards */}
      <div className="space-y-4">
        {filteredRecipes.length === 0 ? (
          <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-8 border border-gray-200 dark:border-afri-earth-700 text-center">
            <p className="text-gray-500 dark:text-afri-cream-400">No recipes found.</p>
          </div>
        ) : (
          filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="bg-white dark:bg-afri-earth-800 rounded-xl border border-gray-200 dark:border-afri-earth-700 overflow-hidden"
            >
              {/* Header */}
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-afri-earth-700/50"
                onClick={() => setExpandedRecipe(expandedRecipe === recipe.id ? null : recipe.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-afri-terracotta-100 dark:bg-afri-terracotta-900/30 flex items-center justify-center">
                    <span className="font-display text-lg font-semibold text-afri-terracotta-600">
                      {recipe.product_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-afri-cream-200">
                      {recipe.product_name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-afri-cream-400">
                      Yield: {recipe.yield_quantity} pieces
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="p-2 text-gray-400 hover:text-afri-terracotta-500"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  {expandedRecipe === recipe.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedRecipe === recipe.id && (
                <div className="border-t border-gray-200 dark:border-afri-earth-700 p-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Ingredients */}
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-afri-cream-200 mb-3">
                        Ingredients
                      </h4>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-afri-earth-700">
                            <th className="text-left py-2 text-gray-500 dark:text-afri-cream-400">
                              Ingredient
                            </th>
                            <th className="text-right py-2 text-gray-500 dark:text-afri-cream-400">
                              Quantity
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {recipe.ingredients.map((ing, idx) => (
                            <tr key={idx} className="border-b border-gray-100 dark:border-afri-earth-700">
                              <td className="py-2 text-gray-700 dark:text-afri-cream-300">
                                {ing.ingredient_name}
                              </td>
                              <td className="py-2 text-right text-gray-700 dark:text-afri-cream-300">
                                {ing.quantity} {ing.unit}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-afri-cream-200 mb-3">
                        Instructions
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-afri-cream-400 leading-relaxed">
                        {recipe.instructions}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
