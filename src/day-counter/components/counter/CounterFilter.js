import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const CounterFilter = ({ currentFilter, onSelectFilter }) => {
  const options = [
    { label: 'Todos', value: 'all' },
    { label: 'Regressivos', value: 'r' },
    { label: 'Progressivos', value: 'p' },
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = currentFilter === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.button, isSelected && styles.buttonSelected]}
            onPress={() => onSelectFilter(option.value)}
          >
            <Text style={[styles.text, isSelected && styles.textSelected]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 6,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonSelected: {
    backgroundColor: '#A855F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#D1D5DB', // A bit lighter for unselected
  },
  textSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
