/**
 * @Copyright https://github.com/kesha-antonov/tutorial_2_zoom_with_react_native_gesture_handler/blob/main/app/Zoom.js
 */

import React, { useState, useRef, useCallback, forwardRef, useEffect } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { TapGestureHandler, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'

function Zoom (props, ref) {
    const {
        renderImage,
        imageWidth,
        imageHeight,
        inFlatList,
    } = props

    const baseScale = useRef(new Animated.Value(1)).current
    const pinchScale = useRef(new Animated.Value(1)).current
    const scale = useRef(Animated.multiply(baseScale, pinchScale)).current
    const lastScale = useRef(1)
    const isZoomedIn = useRef(false)
    const [panGestureEnabled, setPanGestureEnabled] = useState(!inFlatList)

    const [containerWidth, setContainerWidth] = useState(0)
    const [containerHeight, setContainerHeight] = useState(0)

    const translateX = useRef(new Animated.Value(0)).current
    const translateY = useRef(new Animated.Value(0)).current
    const lastOffset = useRef({
        x: 0,
        y: 0,
    }).current

    const zoomOut = useCallback(() => {
        lastScale.current = 1
        Animated.parallel([
            Animated.spring(baseScale, {
                toValue: lastScale.current,
                useNativeDriver: true,
            }),
            Animated.spring(pinchScale, {
                toValue: 1,
                useNativeDriver: true,
            }),
        ]).start()

        lastOffset.x = 0
        lastOffset.y = 0

        translateX.setOffset(lastOffset.x)
        translateX.setValue(0)

        translateY.setOffset(lastOffset.y)
        translateY.setValue(0)

        isZoomedIn.current = false

        if (inFlatList)
            setPanGestureEnabled(false)
    }, [baseScale, pinchScale, lastOffset, translateX, translateY, inFlatList])

    const getImageSize = useCallback(() => {
        return ({
            width: containerWidth,
            height: imageHeight * containerWidth / imageWidth,
        })
    }, [imageWidth, imageHeight, containerWidth])

    const zoomIn = useCallback(() => {
        const imageSize = getImageSize()

        lastScale.current = imageSize.width > imageSize.height ? imageSize.width / imageSize.height * 0.8 : imageSize.height / imageSize.width * 0.8
        if (lastScale.current < 1.2)
            lastScale.current = 1.2
        else if (lastScale.current > 1.5)
            lastScale.current = 1.5

        Animated.parallel([
            Animated.spring(baseScale, {
                toValue: lastScale.current,
                useNativeDriver: true,
            }),
            Animated.spring(pinchScale, {
                toValue: 1,
                useNativeDriver: true,
            }),
        ]).start()

        lastOffset.x = 0
        lastOffset.y = 0

        translateX.setOffset(lastOffset.x)
        translateX.setValue(0)

        translateY.setOffset(lastOffset.y)
        translateY.setValue(0)

        isZoomedIn.current = true

        if (inFlatList)
            setPanGestureEnabled(true)
    }, [baseScale, pinchScale, getImageSize, lastOffset, translateX, translateY, inFlatList])

    const handlePanOutside = useCallback(() => {
        const imageSize = getImageSize()
        const maxOffset = {
            x: imageSize.width * lastScale.current < containerWidth ? 0 : ((imageSize.width * lastScale.current - containerWidth) / 2) / lastScale.current,
            y: imageSize.height * lastScale.current < containerHeight ? 0 : ((imageSize.height * lastScale.current - containerHeight) / 2) / lastScale.current,
        }

        const isPanedXOutside = lastOffset.x > maxOffset.x || lastOffset.x < -maxOffset.x
        if (isPanedXOutside) {
            lastOffset.x = lastOffset.x > 0 ? maxOffset.x : -maxOffset.x

            translateX.flattenOffset()
            Animated.spring(translateX, {
                toValue: lastOffset.x,
                useNativeDriver: true,
            }).start(() => {
                translateX.setOffset(lastOffset.x)
                translateX.setValue(0)
            })
        } else {
            translateX.setOffset(lastOffset.x)
            translateX.setValue(0)
        }

        const isPanedYOutside = lastOffset.y > maxOffset.y || lastOffset.y < -maxOffset.y
        if (isPanedYOutside) {
            lastOffset.y = lastOffset.y > 0 ? maxOffset.y : -maxOffset.y

            translateY.flattenOffset()
            Animated.spring(translateY, {
                toValue: lastOffset.y,
                useNativeDriver: true,
            }).start(() => {
                translateY.setOffset(lastOffset.y)
                translateY.setValue(0)
            })
        } else {
            translateY.setOffset(lastOffset.y)
            translateY.setValue(0)
        }
    }, [containerWidth, containerHeight, getImageSize, lastOffset, translateX, translateY])

    const onPinchHandlerStateChange = useCallback(e => {
        if (e.nativeEvent.oldState === State.ACTIVE) {
            lastScale.current *= e.nativeEvent.scale
            if (lastScale.current > 1) {
                isZoomedIn.current = true
                baseScale.setValue(lastScale.current)
                pinchScale.setValue(1)

                handlePanOutside()
                if (inFlatList)
                    setPanGestureEnabled(true)
            } else {
                zoomOut()
            }
        }
    }, [lastScale, baseScale, pinchScale, handlePanOutside, zoomOut, inFlatList])

    const onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale: pinchScale } }],
        { useNativeDriver: true }
    )

    const getPangestureEvent = useCallback(() => {
        if (!panGestureEnabled)
            return null

        return (
            Animated.event(
                [
                    {
                        nativeEvent: {
                            translationX: translateX,
                            translationY: translateY,
                        },
                    },
                ],
                { useNativeDriver: true }
            )
        )
    }, [panGestureEnabled, translateX, translateY])

    const [onPanGestureEvent, setOnPanGestureEvent] = useState(() => getPangestureEvent())

    useEffect(() => {
        setOnPanGestureEvent(getPangestureEvent())
    }, [getPangestureEvent])

    const onPanHandlerStateChange = useCallback(e => {
        if (e.nativeEvent.oldState === State.ACTIVE) {
            lastOffset.x += e.nativeEvent.translationX
            lastOffset.y += e.nativeEvent.translationY

            handlePanOutside()
        }
    }, [handlePanOutside, lastOffset])

    const onDoubleTap = useCallback(e => {
        if (e.nativeEvent.state === State.ACTIVE)
            if (isZoomedIn.current)
                zoomOut()
            else
                zoomIn()
    }, [zoomIn, zoomOut, isZoomedIn])

    const onLayout = useCallback(({ nativeEvent: { layout: { width, height } } }) => {
        setContainerWidth(width)
        setContainerHeight(height)
    })

    return (
        <TapGestureHandler
            onHandlerStateChange={onDoubleTap}
            numberOfTaps={2}
        >
            <Animated.View
                style={styles.fill}
                collapsable={false}
            >
                <PanGestureHandler
                    onGestureEvent={onPanGestureEvent}
                    onHandlerStateChange={onPanHandlerStateChange}
                    minPointers={panGestureEnabled ? 1 : 0}
                    maxPointers={panGestureEnabled ? 1 : 0}
                    ref={ref}
                    simultaneousHandlers={!panGestureEnabled && props.simultaneousHandlers}
                >
                    <Animated.View
                        style={[styles.fill, styles.panContainer]}
                        onLayout={onLayout}
                        collapsable={false}
                    >
                        <PinchGestureHandler
                            onGestureEvent={onPinchGestureEvent}
                            onHandlerStateChange={onPinchHandlerStateChange}
                            minPointers={2}
                            maxPointers={2}
                        >
                            {renderImage({ scale, translateX, translateY })}
                        </PinchGestureHandler>
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </TapGestureHandler>
    )
}

Zoom = forwardRef(Zoom)

Zoom.propTypes = {
    renderImage: PropTypes.func.isRequired,
    imageWidth: PropTypes.number.isRequired,
    imageHeight: PropTypes.number.isRequired,
    inFlatList: PropTypes.bool.isRequired,
    simultaneousHandlers: PropTypes.array,
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    panContainer: {
        overflow: 'hidden',
    },
})

export default Zoom

