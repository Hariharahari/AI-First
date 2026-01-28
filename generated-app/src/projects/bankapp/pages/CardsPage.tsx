import { useState } from 'react';
import { Card, CardHeader, CardBody, Button, Modal } from '@heroui/react';
import { useBankingStore } from '../store/useBankingStore';
import { CreditCard } from 'lucide-react';

const DUMMY_CARDS = [
  {
    id: '1',
    type: 'credit',
    name: 'Rohan Sharma',
    number: '**** **** **** 1234',
    expiry: '12/25',
    variant: 'Coral',
    cvv: '123',
    limit: 200000,
    issuedDate: '01/2022',
    status: 'Active',
    network: 'Visa'
  },
  {
    id: '2',
    type: 'debit',
    name: 'Rohan Sharma',
    number: '**** **** **** 5678',
    expiry: '06/24',
    variant: 'Platinum',
    cvv: '456',
    limit: 0,
    issuedDate: '03/2021',
    status: 'Active',
    network: 'Mastercard'
  }
];

export default function CardsPage() {
  const cards = useBankingStore((state) => state.cards);
  const displayCards = cards?.length ? cards : DUMMY_CARDS;
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (card: any) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Your Cards</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div
                className={`h-32 flex flex-col justify-between p-6 ${
                  card.type === 'credit'
                    ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-gray-600 text-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-sm opacity-80">ICICI Bank</span>
                  <CreditCard className="h-6 w-6 opacity-80" />
                </div>
                <div className="text-lg font-medium tracking-wider">
                  {card.number}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs opacity-80">Card Holder</div>
                    <div className="font-medium">{card.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-80">Expires</div>
                    <div className="font-medium">{card.expiry}</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-800">
                    {card.type === 'credit' ? 'Credit Card' : 'Debit Card'} ({card.variant})
                  </div>
                  <div className="text-sm text-gray-500">Active</div>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                  onClick={() => openModal(card)}
                >
                  View Details
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
          {selectedCard && (
            <>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">Card Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  selectedCard.type === 'credit'
                    ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-gray-600 text-white'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm opacity-80">ICICI Bank</span>
                    <CreditCard className="h-6 w-6 opacity-80" />
                  </div>
                  <div className="text-lg font-medium tracking-wider mb-4">
                    {selectedCard.number}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-80">Card Holder</div>
                      <div className="font-medium">{selectedCard.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-80">Expires</div>
                      <div className="font-medium">{selectedCard.expiry}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Card Type</span>
                    <span className="font-medium text-gray-800">
                      {selectedCard.type === 'credit' ? 'Credit Card' : 'Debit Card'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Card Variant</span>
                    <span className="font-medium text-gray-800">{selectedCard.variant}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Network</span>
                    <span className="font-medium text-gray-800">{selectedCard.network}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Issued Date</span>
                    <span className="font-medium text-gray-800">{selectedCard.issuedDate}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="font-medium text-green-600">{selectedCard.status}</span>
                  </div>

                  {selectedCard.type === 'credit' && selectedCard.limit && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Credit Limit</span>
                      <span className="font-medium text-orange-500">
                        ₹{selectedCard.limit.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-orange-50 p-3 rounded-lg text-sm text-orange-700">
                  <p className="font-medium mb-1">Security Tips:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Never share your CVV or PIN with anyone</li>
                    <li>Report lost cards immediately</li>
                    <li>Enable transaction alerts for security</li>
                  </ul>
                </div>

                <div className="flex space-x-2">
                  <Button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={closeModal}
                  >
                    Close
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50"
                  >
                    Report Issue
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}