
import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';
import { WheelOption } from '../types';

interface WheelProps {
  options: WheelOption[];
  rotation: Animated.Value;
  isSpinning: boolean;
}

const { width } = Dimensions.get('window');
const SIZE = width * 0.8;
const RADIUS = SIZE / 2 - 10;
const CENTER = SIZE / 2;

const Wheel: React.FC<WheelProps> = ({ options, rotation, isSpinning }) => {
  const totalOptions = options.length;

  if (totalOptions < 2) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: '#e5e5ea' }]}>
        <View style={styles.pointer}>
           <Svg width="30" height="30" viewBox="0 0 30 30">
             <Path d="M15 30L2 4C2 4 15 0 28 4L15 30Z" fill="#333" />
           </Svg>
        </View>
        <Text style={styles.emptyText}>
          {totalOptions === 0 ? "Add options!" : "Add one more!"}
        </Text>
      </View>
    );
  }

  const arcAngle = (2 * Math.PI) / totalOptions;
  const degreeStep = 360 / totalOptions;

  const interpolatedRotation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.pointer}>
        <Svg width="30" height="30" viewBox="0 0 30 30">
          <Path d="M15 30L2 4C2 4 15 0 28 4L15 30Z" fill="#333" />
        </Svg>
      </View>

      <Animated.View style={{ transform: [{ rotate: interpolatedRotation }] }}>
        <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <G>
            {options.map((option, index) => {
              const startAngle = index * arcAngle;
              const endAngle = (index + 1) * arcAngle;

              const x1 = CENTER + RADIUS * Math.cos(startAngle);
              const y1 = CENTER + RADIUS * Math.sin(startAngle);
              const x2 = CENTER + RADIUS * Math.cos(endAngle);
              const y2 = CENTER + RADIUS * Math.sin(endAngle);

              const largeArcFlag = arcAngle > Math.PI ? 1 : 0;
              const pathData = `M ${CENTER} ${CENTER} L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

              const textAngle = (index * degreeStep) + (degreeStep / 2);

              return (
                <G key={option.id}>
                  <Path d={pathData} fill={option.color} stroke="#fff" strokeWidth="2" />
                  <G transform={`rotate(${textAngle}, ${CENTER}, ${CENTER})`}>
                    <SvgText
                      x={CENTER + RADIUS * 0.6}
                      y={CENTER}
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                    >
                      {option.label.length > 10 ? option.label.slice(0, 8) + '...' : option.label}
                    </SvgText>
                  </G>
                </G>
              );
            })}
          </G>
          <Circle cx={CENTER} cy={CENTER} r="15" fill="white" stroke="#333" strokeWidth="4" />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  emptyText: {
    color: '#8e8e93',
    fontWeight: '600',
    fontSize: 18,
  },
  pointer: {
    position: 'absolute',
    top: -15,
    zIndex: 10,
  },
});

export default Wheel;
