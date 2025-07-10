'use client';

import React from 'react';
import { Device } from '@/types/checkflow';
import { MapPin } from 'lucide-react';

interface DashboardDevicesProps {
  devices: Device[];
}

const DashboardDevices: React.FC<DashboardDevicesProps> = ({ devices }) => {
  const formatLastConnection = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }) + ' в ' + date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">📱</span>
            <h3 className="text-lg font-semibold text-gray-900">Устройства</h3>
          </div>
          <div className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
            Все устройства
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">L42687655</p>
                  <p className="text-sm text-gray-500">Последнее соединение</p>
                  <p className="text-sm font-medium text-gray-900">11.06.2025 в 16:20</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <MapPin size={16} />
              <span>Бектемирский район, улица Хусейна Байкара 87</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">L42687620</p>
                  <p className="text-sm text-gray-500">Последнее соединение</p>
                  <p className="text-sm font-medium text-gray-900">11.06.2025 в 16:59</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <MapPin size={16} />
              <span>Бектемирский район, улица Хусейна Байкара 87</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDevices;