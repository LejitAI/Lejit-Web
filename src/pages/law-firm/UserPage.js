import React, { useState, useEffect } from 'react';
import { UserPlus, Edit, Trash2, Search, Shield, Upload, Camera } from 'lucide-react';
import { Layout } from './Layout';

const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => (
  <div className="relative mb-4">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <Icon className="text-gray-400" size={18} />
    </div>
    <input
      type={type}
      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const PhotoUpload = ({ photo, onPhotoChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
          {photo ? (
            <img src={photo} alt="User" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Camera className="text-gray-400" size={32} />
            </div>
          )}
        </div>
        <div>
          <label className="cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium py-2 px-4 rounded-lg flex items-center">
            <Upload className="mr-2" size={18} />
            Upload Photo
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <p className="text-sm text-gray-500 mt-1">Max size: 5MB</p>
        </div>
      </div>
    </div>
  );
};

const SelectField = ({ icon: Icon, options, value, onChange, placeholder }) => (
  <div className="relative mb-4">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <Icon className="text-gray-400" size={18} />
    </div>
    <select
      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const PermissionSection = ({ permissions, userPermissions, onPermissionChange }) => (
  <div className="mt-4 border rounded-lg p-4 bg-gray-50">
    <h4 className="font-semibold mb-3">Permissions</h4>
    <div className="grid grid-cols-2 gap-4">
      {permissions.map((permission) => (
        <div key={permission.module} className="bg-white p-3 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium capitalize">{permission.module.replace('_', ' ')}</span>
          </div>
          <div className="space-y-2">
            {['view', 'create', 'edit', 'delete', 'approve'].map((action) => (
              <label key={action} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={userPermissions[permission.module]?.[action] || false}
                  onChange={() => onPermissionChange(permission.module, action)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded"
                />
                <span className="text-sm capitalize">{action}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const UserCard = ({ user, onEdit, onDelete, permissions, onPermissionChange }) => (
  <div className="bg-white rounded-lg shadow-md mb-6">
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
            {user.photo ? (
              <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="text-gray-400" size={24} />
              </div>
            )}
          </div>
          <div>
            <h4 className="text-lg font-semibold">{user.name}</h4>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(user)}
            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <h5 className="font-medium text-sm mb-1">Contact</h5>
          <p className="text-sm">{user.contact}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <h5 className="font-medium text-sm mb-1">Role</h5>
          <p className="text-sm capitalize">{user.role.replace('_', ' ')}</p>
        </div>
      </div>
      <PermissionSection
        permissions={permissions}
        userPermissions={user.permissions}
        onPermissionChange={(module, action) => onPermissionChange(user.id, module, action)}
      />
    </div>
  </div>
);

const UserDialog = ({ isOpen, onClose, user, setUser, handleSave, isEditing }) => {
  if (!isOpen) return null;

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'case_manager', label: 'Case Manager' },
    { value: 'assignee', label: 'Assignee' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit User' : 'Add New User'}</h2>
        
        <PhotoUpload
          photo={user.photo}
          onPhotoChange={(photo) => setUser({ ...user, photo })}
        />

        <InputField
          icon={Shield}
          type="text"
          placeholder="User Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <InputField
          icon={Shield}
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <InputField
          icon={Shield}
          type="tel"
          placeholder="Contact"
          value={user.contact}
          onChange={(e) => setUser({ ...user, contact: e.target.value })}
        />
        <SelectField
          icon={Shield}
          options={roleOptions}
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          placeholder="Select a role"
        />
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white hover:bg-blue-700 font-medium py-2 px-4 rounded-lg"
          >
            {isEditing ? 'Update' : 'Save'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const permissions = [
    { module: 'dashboard' },
    { module: 'cases' },
    { module: 'tasks' },
    { module: 'appointments' },
    { module: 'documents' },
    { module: 'clients' }
  ];

  const generatePermissions = (role) => {
    const basePermissions = {};
    permissions.forEach(({ module }) => {
      basePermissions[module] = {
        view: true,
        create: false,
        edit: false,
        delete: false,
        approve: false
      };
    });

    switch (role) {
      case 'admin':
        Object.keys(basePermissions).forEach(module => {
          basePermissions[module] = {
            view: true,
            create: true,
            edit: true,
            delete: true,
            approve: true
          };
        });
        break;
      case 'case_manager':
        ['cases', 'tasks', 'appointments'].forEach(module => {
          basePermissions[module] = {
            view: true,
            create: true,
            edit: true,
            delete: true,
            approve: true
          };
        });
        break;
      case 'assignee':
        ['cases', 'tasks', 'appointments'].forEach(module => {
          basePermissions[module] = {
            view: true,
            create: true,
            edit: true,
            delete: false,
            approve: false
          };
        });
        break;
    }
    return basePermissions;
  };

  useEffect(() => {
    const defaultUsers = [
      {
        id: 1,
        name: 'John Admin',
        email: 'john@example.com',
        contact: '1234567890',
        role: 'admin',
        photo: null,
        permissions: generatePermissions('admin')
      },
      {
        id: 2,
        name: 'Jane Manager',
        email: 'jane@example.com',
        contact: '9876543210',
        role: 'case_manager',
        photo: null,
        permissions: generatePermissions('case_manager')
      },
      {
        id: 3,
        name: 'Bob Assignee',
        email: 'bob@example.com',
        contact: '5555555555',
        role: 'assignee',
        photo: null,
        permissions: generatePermissions('assignee')
      }
    ];
    setUsers(defaultUsers);
  }, []);

  const handleSaveUser = () => {
    if (currentUser.id) {
      setUsers(users.map(user => 
        user.id === currentUser.id ? {
          ...currentUser,
          permissions: generatePermissions(currentUser.role)
        } : user
      ));
    } else {
      const newUser = {
        ...currentUser,
        id: users.length + 1,
        permissions: generatePermissions(currentUser.role)
      };
      setUsers([...users, newUser]);
    }
    setIsDialogOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  const handleAddNewUser = () => {
    setCurrentUser({
      name: '',
      email: '',
      contact: '',
      role: '',
      photo: null,
      permissions: {}
    });
    setIsDialogOpen(true);
  };

  const handlePermissionChange = (userId, module, action) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          permissions: {
            ...user.permissions,
            [module]: {
              ...user.permissions[module],
              [action]: !user.permissions[module][action]
            }
          }
        };
      }
      return user;
    }));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">User Management</h3>
              <button
                onClick={handleAddNewUser}
                className="mt-3 sm:mt-0 bg-blue-600 text-white hover:bg-blue-700 font-medium py-2 px-4 rounded-lg flex items-center"
              >
                <UserPlus className="mr-2" size={18} /> Add User
              </button>
            </div>

            <div className="mb-6">
              <InputField
                icon={Search}
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-6">
              {filteredUsers.map((user) => (
                <UserCard
                key={user.id}
                user={user}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                permissions={permissions}
                onPermissionChange={handlePermissionChange}
              />
            ))}
          </div>
        </div>
      </div>

      <UserDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setCurrentUser(null);
        }}
        user={currentUser || {}}
        setUser={setCurrentUser}
        handleSave={handleSaveUser}
        isEditing={!!currentUser?.id}
      />
    </div>
  </Layout>
);
};

export default UserManagement;