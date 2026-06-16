import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Key, Shield, User } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useWorker } from '../../contexts/WorkerContext'

export default function WorkersPage() {
  const { currentWorker } = useWorker()

  const [workers, setWorkers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWorkers()
  }, [])

  const loadWorkers = async () => {
    try {
      const { data, error } = await supabase
        .from('workers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error)
        return
      }

      setWorkers(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleWorkerStatus = async (
    workerId: string,
    currentStatus: boolean
  ) => {
    const { error } = await supabase
      .from('workers')
      .update({
        is_active: !currentStatus
      })
      .eq('id', workerId)

    if (error) {
      console.error(error)
      return
    }

    loadWorkers()
  }

  const deleteWorker = async (workerId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this worker?'
    )

    if (!confirmed) return

    const { error } = await supabase
      .from('workers')
      .delete()
      .eq('id', workerId)

    if (error) {
      console.error(error)
      return
    }

    loadWorkers()
  }

  if (currentWorker?.role !== 'owner') {
    return (
      <div className="bg-white dark:bg-afri-earth-800 rounded-xl p-8 border border-gray-200 dark:border-afri-earth-700 text-center">
        <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />

        <h2 className="text-xl font-semibold text-gray-900 dark:text-afri-cream-200 mb-2">
          Access Denied
        </h2>

        <p className="text-gray-500 dark:text-afri-cream-400">
          Only the owner can manage workers.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading workers...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-afri-cream-200">
            Workers Management
          </h1>

          <p className="text-gray-500 dark:text-afri-cream-400">
            Add, edit, and manage bakery staff
          </p>
        </div>

        <button className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add Worker
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workers.map(worker => (
          <div
            key={worker.id}
            className="bg-white dark:bg-afri-earth-800 rounded-xl p-6 border border-gray-200 dark:border-afri-earth-700"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-full bg-afri-terracotta-100 dark:bg-afri-terracotta-900/30 flex items-center justify-center">
                <User className="w-7 h-7 text-afri-terracotta-500" />
              </div>

              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  worker.role === 'owner'
                    ? 'bg-afri-gold-100 text-afri-gold-700 dark:bg-afri-gold-900/30 dark:text-afri-gold-400'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {worker.role}
              </span>
            </div>

            <h3 className="font-semibold text-lg text-gray-900 dark:text-afri-cream-200 mb-1">
              {worker.full_name}
            </h3>

            <p className="text-sm text-gray-500 dark:text-afri-cream-400 mb-4">
              {worker.is_active ? 'Active' : 'Inactive'}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-afri-earth-700">
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-afri-terracotta-500 rounded-lg hover:bg-gray-100 dark:hover:bg-afri-earth-700">
                  <Edit className="w-4 h-4" />
                </button>

                <button className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-gray-100 dark:hover:bg-afri-earth-700">
                  <Key className="w-4 h-4" />
                </button>

                {worker.role !== 'owner' && (
                  <button
                    onClick={() => deleteWorker(worker.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 dark:hover:bg-afri-earth-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                onClick={() =>
                  toggleWorkerStatus(
                    worker.id,
                    worker.is_active
                  )
                }
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  worker.is_active
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {worker.is_active ? 'Active' : 'Inactive'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}