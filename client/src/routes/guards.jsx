import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingState } from '../components/ui';

export function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <LoadingState message="Authenticating..." />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role check — enforced backend side too, this is only for UX routing
  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Redirect to onboarding if not completed (except for onboarding page itself)
  if (user.role === 'LEARNER' && !user.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

export function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <LoadingState message="Authenticating..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // Backend will also enforce this — this is only UX-level redirect
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
}

export function GuestRoute({ children }) {
  const { isAuthenticated, isAdmin, user, loading } = useAuth();

  if (loading) return <LoadingState message="Loading..." />;
  if (isAuthenticated) {
    if (isAdmin) return <Navigate to="/admin" replace />;
    if (!user?.onboardingCompleted) return <Navigate to="/onboarding" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export function OnboardingRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <LoadingState message="Loading..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.onboardingCompleted) return <Navigate to="/dashboard" replace />;

  return children;
}
