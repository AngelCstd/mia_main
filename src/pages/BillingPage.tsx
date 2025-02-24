import React from 'react';
import {
  ArrowLeft,
  Download,
  Mail,
  Receipt,
  Building2,
  Calendar,
  FileText,
  DollarSign,
  Percent,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface InvoiceDataInterface {
  business_name: string;
  rfc: string;
  email: string;
  booking: {
    hotel_name: string;
    check_in: string;
    check_out: string;
    confirmation_code: string;
  };
  amount: number;
  tax_percentage: number;
  total_amount: number;
};

interface BillingPageProps {
  onBack: () => void;
  invoiceData: InvoiceDataInterface
}

export const BillingPage: React.FC<BillingPageProps> = ({ onBack, invoiceData }) => {
  // Mock data - Reemplazar con datos reales
  const data = invoiceData || {
    business_name: "Empresa de Ejemplo S.A. de C.V.",
    rfc: "EEJ920629HY7",
    email: "facturacion@ejemplo.com",
    booking: {
      hotel_name: "Hotel Grand Plaza",
      check_in: "2025-02-20",
      check_out: "2025-02-25",
      confirmation_code: "RES123456"
    },
    amount: 5000.00,
    tax_percentage: 16,
    total_amount: 5800.00
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  const handleDownloadPDF = () => {
    // Implementar lógica de descarga de PDF
    console.log('Descargando PDF...');
  };

  const handleSendEmail = () => {
    // Implementar lógica de envío por correo
    console.log('Enviando por correo...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Volver</span>
          </button>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="p-8 bg-blue-50 border-b border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Facturación</h2>
                  <p className="text-gray-600">Detalles de la factura</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSendEmail}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Enviar por Correo</span>
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Descargar PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Billing Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Building2 className="w-5 h-5 text-blue-600 mr-2" />
                  Datos de Facturación
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-900 font-medium">{data.business_name}</p>
                  <p className="text-gray-600">RFC: {data.rfc}</p>
                  <p className="text-gray-600">{data.email}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                  Detalles de la Reserva
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-900 font-medium">{data.booking.hotel_name}</p>
                  <p className="text-gray-600">
                    {formatDate(data.booking.check_in)} - {formatDate(data.booking.check_out)}
                  </p>
                  <p className="text-gray-600">
                    Confirmación: {data.booking.confirmation_code}
                  </p>
                </div>
              </div>
            </div>


            <BillingPageAmountDetails invoiceData={data} />

            <BillingPageActions onClick={() => { console.log("hola") }} />

          </div>
        </div>
      </div>
    </div>
  );
};


const BillingPageAmountDetails = ({ invoiceData }: { invoiceData: InvoiceDataInterface }) => {

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FileText className="w-5 h-5 text-blue-600 mr-2" />
        Desglose
      </h3>
      <div className="space-y-4">

        <AmountDetailsSplit amount={formatCurrency(invoiceData.amount)}>
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Subtotal</span>
        </AmountDetailsSplit>
        <AmountDetailsSplit amount={formatCurrency(invoiceData.amount * (invoiceData.tax_percentage / 100))}>
          <Percent className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">IVA ({invoiceData.tax_percentage}%)</span>
        </AmountDetailsSplit>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(invoiceData.total_amount)}
            </span>
          </div>
        </div>

      </div>
    </div >
  )
}

const AmountDetailsSplit = ({ children, amount }: { children: React.ReactNode, amount: string }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {children}
      </div>
      <span className="text-gray-900 font-medium">{amount}</span>
    </div>
  )
}

const BillingPageActions = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="mt-8 flex justify-end" >
      <button
        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        onClick={onClick}
      >
        <CheckCircle2 className="w-5 h-5" />
        <span>Confirmar y Generar Factura</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div >
  )
}

// Helpers
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
};