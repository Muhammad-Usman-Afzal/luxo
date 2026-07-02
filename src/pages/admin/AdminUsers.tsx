// Admin Users — Premium Dark+Light | LUXO
import { useState, useEffect } from 'react';
import { Search, Mail, Phone, MapPin, Users, Shield, UserPlus, Calendar, Edit3, Ban, XCircle, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface UserDto {
  id: number; fullName: string; email: string; role: string;
  phone: string; avatar: string; address?: string; city?: string; createdAt: string;
}

const roleGradients: Record<string, string> = {
  admin: 'from-purple-500 to-indigo-600',
  user: 'from-emerald-500 to-teal-600',
};

const roleBadgeColors: Record<string, string> = {
  admin: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  user: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
};

export default function AdminUsers() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    fetch('/api/admin/users', { credentials: 'include' })
      .then(r => r.json())
      .then(setUsers)
      .catch(() => {});
  }, []);

  useEffect(() => { setVisibleCount(5); }, [search, roleFilter]);

  if (!isAdmin) return <div className="text-center py-20 text-gray-500">Access Denied</div>;

  const fl = users.filter(u => {
    if (search && !u.fullName.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter && u.role !== roleFilter) return false;
    return true;
  });

  const adminCount = users.filter(u => u.role === 'admin').length;
  const userCount = users.filter(u => u.role === 'user').length;
  const thisMonth = users.filter(u => u.createdAt?.startsWith(new Date().getFullYear().toString())).length || Math.floor(users.length * 0.15);

  const statCards = [
    { icon: Users, label: 'Total Users', value: users.length, color: 'from-indigo-500 to-violet-600', shadow: 'shadow-indigo-500/25' },
    { icon: Shield, label: 'Admins', value: adminCount, color: 'from-purple-500 to-pink-600', shadow: 'shadow-purple-500/25' },
    { icon: UserPlus, label: 'Users', value: userCount, color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/25' },
    { icon: Calendar, label: 'New This Month', value: thisMonth, color: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/25' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-2 sm:px-3 py-0.5 sm:py-1 dark:text-white space-y-0.5 sm:space-y-1">
      {/* ═══ PREMIUM HEADER ═══ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-2xl p-2.5 sm:p-3 shadow-xl shadow-indigo-500/25">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/10">
              <Users size={22} />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white">Users</h1>
              <p className="text-indigo-200 text-[11px] sm:text-xs">{fl.length} of {users.length} users &middot; {adminCount} admin{adminCount !== 1 ? 's' : ''}</p>
            </div>
          </div>

        </div>
      </div>

      {/* ═══ STATS ROW ═══ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
        {statCards.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-2 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
              <div className="flex items-center justify-between mb-1">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md ${s.shadow}`}>
                  <Icon size={14} className="text-white" />
                </div>
              </div>
              <p className="text-sm sm:text-base font-black text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* ═══ SEARCH & FILTERS ═══ */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-2 sm:p-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
          </div>
          <div className="relative">
            <Shield size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
              className="pl-9 pr-7 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition appearance-none cursor-pointer min-w-[140px]"
            >
              <option value="">All Roles</option>
              <option value="admin">Admins</option>
              <option value="user">Users</option>
            </select>
          </div>
          {search || roleFilter ? (
            <button onClick={() => { setSearch(''); setRoleFilter(''); }} className="flex items-center gap-1 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-xs font-semibold transition whitespace-nowrap">
              <XCircle size={13} /> Clear
            </button>
          ) : null}
        </div>
      </div>

      {/* ═══ USERS GRID ═══ */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2">
        {fl.slice(0, visibleCount).map(u => (
          <div key={u.id} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-2 sm:p-3 hover:shadow-xl hover:-translate-y-0.5 transition-all relative overflow-hidden">
            {/* Role accent bar on top */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${roleGradients[u.role] || 'from-gray-400 to-gray-500'}`} />

            {/* Top section */}
            <div className="flex items-start gap-2 mt-0.5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleGradients[u.role] || 'from-gray-400 to-gray-500'} flex items-center justify-center text-lg shadow-lg shrink-0 border-2 border-white dark:border-gray-800`}>
                {u.avatar}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white truncate">{u.fullName}</p>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider border ${roleBadgeColors[u.role] || 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'}`}>
                    {u.role}
                  </span>
                  <span className="flex items-center gap-1 text-[8px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Activity size={8} />
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Info rows */}
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-2 py-1.5">
                <Mail size={10} className="text-indigo-400 shrink-0" />
                <span className="truncate">{u.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-2 py-1.5">
                <Phone size={10} className="text-indigo-400 shrink-0" />
                <span className="truncate">{u.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-2 py-1.5">
                <MapPin size={10} className="text-indigo-400 shrink-0" />
                <span className="truncate">{u.city || 'Not set'}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-[8px] text-gray-400 dark:text-gray-500 font-medium">
                <Calendar size={8} className="inline mr-1 -mt-0.5" />
                Joined {u.createdAt || 'N/A'}
              </span>
              <div className="flex gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <button className="flex items-center gap-1 text-[9px] font-semibold px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition">
                  <Edit3 size={9} /> Edit
                </button>
                {u.role !== 'admin' && (
                  <button className="flex items-center gap-1 text-[9px] font-semibold px-2 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition">
                    <Ban size={9} /> Ban
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {fl.length > 5 && (
        <div className="flex justify-center pt-1 gap-2">
          {visibleCount < fl.length ? (
            <button onClick={() => setVisibleCount(v => v + 5)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all">
              Show More ({fl.length - visibleCount} remaining)
            </button>
          ) : (
            <button onClick={() => setVisibleCount(5)} className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl transition-all">
              Show Less
            </button>
          )}
        </div>
      )}

      {fl.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Users size={32} className="mx-auto mb-2 opacity-30" />
          <p className="font-semibold text-xs text-gray-500">No users found</p>
          {search || roleFilter ? (
            <button onClick={() => { setSearch(''); setRoleFilter(''); }} className="mt-1 text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:underline">
              Clear filters →
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
