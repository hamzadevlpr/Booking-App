import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LeftIcon from "../assets/icons/left.svg"
import RightIcon from "../assets/icons/right.svg"

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
interface SelectDateModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (dates: { checkIn: string; checkOut: string }) => void;
}

// Helper function types
const generateCalendarDays = (year: number, month: number): (number | null)[][] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekday = firstDay.getDay(); // 0 = Sunday

  const days: (number | null)[] = [];
  let currentDay = 1;

  // Previous month padding
  for (let i = 0; i < startWeekday; i++) {
    days.push(null);
  }

  // Current month days
  while (currentDay <= daysInMonth) {
    days.push(currentDay);
    currentDay++;
  }

  // Next month padding to fill 42 cells (6 weeks)
  while (days.length < 42) {
    days.push(null);
  }

  // Split into weeks
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const SelectDateModal: React.FC<SelectDateModalProps> = ({ visible, onClose, onApply }) => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const [tempCheckIn, setTempCheckIn] = useState<Date | null>(null);
  const [tempCheckOut, setTempCheckOut] = useState<Date | null>(null);

  const days = generateCalendarDays(currentYear, currentMonth);

  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const isPastDay = (day: number | null): boolean => {
    if (day === null) return false;

    const date = new Date(currentYear, currentMonth, day);
    date.setHours(0, 0, 0, 0); // Normalize to start of day

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    return date < todayStart;
  };

  const handleDayPress = (day: number | null) => {
    if (day === null) return;

    const selectedDate = new Date(currentYear, currentMonth, day);

    // Don't allow past dates (compare only date part)
    if (selectedDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      return;
    }

    if (!tempCheckIn || (tempCheckIn && tempCheckOut)) {
      // First selection → check-in
      setTempCheckIn(selectedDate);
      setTempCheckOut(null);
    } else {
      // Second selection → check-out
      if (selectedDate > tempCheckIn) {
        setTempCheckOut(selectedDate);
      } else {
        // If user clicks earlier date → swap (new check-in)
        setTempCheckOut(tempCheckIn);
        setTempCheckIn(selectedDate);
      }
    }
  };

  const isInRange = (day: number | null): boolean => {
    if (!tempCheckIn || !tempCheckOut || day === null) return false;
    const date = new Date(currentYear, currentMonth, day);
    return date > tempCheckIn && date < tempCheckOut;
  };

  const isCheckIn = (day: number | null): boolean =>
    tempCheckIn !== null &&
    day === tempCheckIn.getDate() &&
    currentMonth === tempCheckIn.getMonth() &&
    currentYear === tempCheckIn.getFullYear();

  const isCheckOut = (day: number | null): boolean =>
    tempCheckOut !== null &&
    day === tempCheckOut.getDate() &&
    currentMonth === tempCheckOut.getMonth() &&
    currentYear === tempCheckOut.getFullYear();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleApply = () => {
    if (tempCheckIn && tempCheckOut) {
      onApply({
        checkIn: formatDate(tempCheckIn),
        checkOut: formatDate(tempCheckOut),
      });
      setCheckIn(tempCheckIn);
      setCheckOut(tempCheckOut);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Select Dates</Text>

          {/* Month Navigation */}
          <View style={styles.monthRow}>
            <TouchableOpacity style={styles.arrowBtn} onPress={handlePrevMonth}>
              <Text style={styles.arrow}>
                <LeftIcon width={16} height={16} />
              </Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>{monthName}</Text>
            <TouchableOpacity style={styles.arrowBtn} onPress={handleNextMonth}>
              <Text style={styles.arrow}>
                <RightIcon width={16} height={16} />
              </Text>
            </TouchableOpacity>
          </View>

          {/* Days of Week */}
          <View style={styles.daysOfWeekRow}>
            {daysOfWeek.map((d) => (
              <Text key={d} style={styles.dayOfWeek}>
                {d}
              </Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={styles.calendarContainer}>
            {days.map((week, i) => (
              <View key={i} style={styles.weekRow}>
                {week.map((day, dayIndex) => {
                  if (day === null) {
                    return <View key={dayIndex} style={styles.dayCell} />;
                  }

                  const isSelected = isCheckIn(day) || isCheckOut(day);
                  const inRange = isInRange(day);
                  const isPast = isPastDay(day);
                  return (
                    <TouchableOpacity
                      key={dayIndex}
                      style={[
                        styles.dayCell,
                        inRange && styles.rangeDay,
                        isSelected && styles.selectedDay,
                        isPast && styles.disabledDay,
                      ]}
                      onPress={() => !isPast && handleDayPress(day)}
                      disabled={isPast}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isPast && styles.disabledDayText,
                          isSelected && styles.selectedDayText,
                          inRange && styles.rangeDayText,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.applyButton,
                (!tempCheckIn || !tempCheckOut) && styles.applyButtonDisabled,
              ]}
              onPress={handleApply}
              disabled={!tempCheckIn || !tempCheckOut}
            >
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}; const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  disabledDay: {
    // Optional: very light background or no background
    // backgroundColor: 'transparent',
  },
  modal: {
    width: 340,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    paddingBottom: 28,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  arrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9EBED',
  },
  arrow: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
  },
  monthText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 24,
  },
  daysOfWeekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  dayOfWeek: {
    width: 40,
    textAlign: 'center',
    fontSize: 13,
    color: '#8A8A8E',
    fontWeight: '500',
  },
  disabledDayText: {
    color: '#C0C0C0',
    opacity: 0.6,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: '600',
  },
  rangeDayText: {
    color: '#1E40AF',
    fontWeight: '500',
  },
  calendarContainer: {
    width: '100%',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dayCell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rangeDay: {
    backgroundColor: '#E8F0FE',
  },
  selectedDay: {
    backgroundColor: '#1E40AF', // deep blue similar to screenshot
  },
  dayText: {
    fontSize: 16,
    color: '#1F2937',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: {
    color: '#EF4444', // red like screenshot
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#1E40AF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 12,
  },
  applyButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  applyText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SelectDateModal;
