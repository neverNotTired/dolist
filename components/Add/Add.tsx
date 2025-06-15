import { View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useState, useRef } from 'react';
import { s } from './Add.style';

interface AddProps {
  onPress: () => void;
  onLongPress: () => void;
}

export const Add = ({ onPress, onLongPress }: AddProps) => {
  const [showTrash, setShowTrash] = useState(false);
  const trashTimer = useRef<NodeJS.Timeout | null>(null);

  const handlePressIn = () => {
    // Start a short timer to show the trash can *after* 200ms
    trashTimer.current = setTimeout(() => {
      setShowTrash(true);
    }, 200);
  };

  const handlePressOut = () => {
    // Clear any pending timers and hide the trash can
    if (trashTimer.current) {
      clearTimeout(trashTimer.current);
      trashTimer.current = null;
    }
    setShowTrash(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={s.btn}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        delayLongPress={600}
      >
        <Svg
          style={s.svg}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4278da"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {showTrash ? (
            // 🗑 Trash Icon
            <>
              <Path d="M3 6h18" />
              <Path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" />
              <Path d="M10 11v6" />
              <Path d="M14 11v6" />
              <Path d="M9 6V4h6v2" />
            </>
          ) : (
            // ➕ Plus Icon
            <Path d="M12 5V19M5 12H19" />
          )}
        </Svg>
      </TouchableOpacity>
    </View>
  );
};
