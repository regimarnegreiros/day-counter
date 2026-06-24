import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

export const CounterSort = ({ currentSort, onSelectSort }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const sortOptions = [
    { label: 'Padrão', value: 'default' },
    { label: 'Mais próximos', value: 'closest' },
    { label: 'Mais distantes', value: 'farthest' },
  ];

  const selectedLabel = sortOptions.find(o => o.value === currentSort)?.label || 'Padrão';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ordenar por</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedLabel}</Text>
        <ChevronDown size={16} color="#4B5563" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalOption}
                onPress={() => {
                  onSelectSort(option.value);
                  setModalVisible(false);
                }}
              >
                <Text style={[
                  styles.modalOptionText,
                  currentSort === option.value && styles.modalOptionTextSelected
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 3,
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    minWidth: 120,
  },
  dropdownText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 190, 
    paddingRight: 16,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 4,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#4B5563',
  },
  modalOptionTextSelected: {
    color: '#9333EA',
    fontWeight: 'bold',
  },
});
