import { CheckCircle2 } from 'lucide-react'
import React from 'react'
import { Link } from "react-router-dom";


const ResetPassSuccess = () => {
  return (
    <div>
      <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-700 dark:text-emerald-400 mx-auto" />
            <h4 className="font-serif-tea text-lg font-bold text-stone-900 dark:text-stone-100">
              Password Restored!
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              You can now sign in with your brand new password.
            </p>
            <Link
              to="/login"
              className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold"
            >
              Go to Sign In
            </Link>
          </div>
    </div>
  )
}

export default ResetPassSuccess
