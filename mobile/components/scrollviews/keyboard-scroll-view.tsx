import { forwardRef } from 'react';
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScrollViewComponent = forwardRef<
  React.ComponentRef<typeof KeyboardAwareScrollView>,
  KeyboardAwareScrollViewProps
>(({ children, ...props }, ref) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      ref={ref}
      bottomOffset={insets.bottom + 20}
      showsVerticalScrollIndicator={false}
      bounces={false}
      extraKeyboardSpace={30}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
});

export default ScrollViewComponent;
