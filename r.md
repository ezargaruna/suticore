Вход в Recovery:

Выключить MacBook.

Зажать кнопку питания и удерживать до появления «Loading startup options».

Выбрать Options -> Continue.

Выбрать Terminal в верхнем меню (Utilities -> Terminal).

Шаг 1: Разблокировка (Unlock)
Так как диск зашифрован FileVault, в терминале Recovery нужно его смонтировать:
diskutil apfs unlockVolume disk3s1
(Потребуется пароль пользователя).

Шаг 2: Принудительное выравнивание
В режиме Recovery ограничения на «слишком маленькие изменения» обычно снимаются. Выполнить:
diskutil apfs resizeContainer disk3 333g

Если снова возникнет ошибка размера, выполнить расширение до упора:
diskutil apfs resizeContainer disk3 0
А затем сразу сжатие:
diskutil apfs resizeContainer disk3 330g

Верификация:
Выполнить diskutil list.
Критерий успеха: Раздел disk0s2 должен иметь размер ~333 GB, а после него должен отображаться свободный блок (free space) объемом ~160 GB.
