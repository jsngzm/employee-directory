import { useState } from 'react'
import Login from './components/Login'
import EmployeeList from './components/EmployeeList'
import EmployeeDetail from './components/EmployeeDetail'
import EmployeeForm from './components/EmployeeForm'
import type { Employee } from './types'

type View =
  | { page: 'list' }
  | { page: 'detail'; employeeId: number }
  | { page: 'form'; employee: Employee | null }

function App() {
  const [token, setToken] = useState<string | null>(null)
  const [view, setView] = useState<View>({ page: 'list' })

  if (!token) {
    return <Login onLogin={setToken} />
  }

  if (view.page === 'detail') {
    return (
      <EmployeeDetail
        token={token}
        employeeId={view.employeeId}
        onBack={() => setView({ page: 'list' })}
        onEdit={(employee) => setView({ page: 'form', employee })}
      />
    )
  }

  if (view.page === 'form') {
    return (
      <EmployeeForm
        token={token}
        employee={view.employee}
        onClose={() => setView({ page: 'list' })}
        onSaved={() => setView({ page: 'list' })}
      />
    )
  }

  return (
    <EmployeeList
      token={token}
      onLogout={() => setToken(null)}
      onSelectEmployee={(id) => setView({ page: 'detail', employeeId: id })}
      onEditEmployee={(employee) => setView({ page: 'form', employee })}
      onAddEmployee={() => setView({ page: 'form', employee: null })}
    />
  )
}

export default App
