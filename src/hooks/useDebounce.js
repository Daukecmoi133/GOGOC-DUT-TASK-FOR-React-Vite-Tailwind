import { useEffect, useState } from 'react'

/**
 * Hook trì hoãn cập nhật giá trị cho đến khi hết thời gian delay
 * @param {any} value Giá trị cần debounce
 * @param {number} delay Thời gian chờ (ms)
 * @returns {any} Giá trị sau khi debounce
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
