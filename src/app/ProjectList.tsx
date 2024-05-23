'use client'

import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../../amplify/data/resource'
import { useMutation, useQuery } from '@tanstack/react-query'

const client = generateClient<Schema>()

export default function ProjectList() {
  const query = useQuery({
    queryKey: ['projects'],
    async queryFn () {
      return await client.models.Project.list()
    }
  })

  const createMutation = useMutation({
    mutationFn: async () => {
      await client.models.Project.create({
        name: window.prompt("Name ?")
      })
    },
    onSuccess () {
      query.refetch()
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await client.models.Project.delete({ id })
    },
    onSuccess () {
      query.refetch()
    }
  })


  return (
    <div>
      <h1>Projects</h1>
      <button onClick={() => createMutation.mutate()}>
        New Project
      </button>
      <hr />
      {query.isLoading && <p>Loading...</p>}
      {query.isError && <p>Error: {String(query.error)}</p>}
      {query.data && (
        <ul>
          {query.data.data.map((project) => (
            <li key={project.id}>
              {project.name}
              <button onClick={() => deleteMutation.mutate(project.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
