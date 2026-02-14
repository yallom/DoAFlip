import { type ScrollViewProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type KeyboardScrollViewProps = ScrollViewProps & {
    bottomOffset?: number;
    topOffset?: number;
};

export function KeyboardScrollView({
    children,
    contentContainerStyle,
    bottomOffset = 24,
    topOffset = 40,
    ...rest
}: KeyboardScrollViewProps) {
    const insets = useSafeAreaInsets();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={[
                {
                    flexGrow: 1,
                    paddingTop: insets.top + topOffset,
                    paddingBottom: insets.bottom + bottomOffset,
                },
                contentContainerStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bottomOffset={bottomOffset}
            {...rest}
        >
            {children}
        </KeyboardAwareScrollView>
    );
}
