
/**
* このファイルを使って、独自の関数やブロックを定義してください。
* 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="\uf26c"
namespace LCD1602 {

    /**
         * i2caddrにコマンドを送信します
         * @param i2caddr describe parameter here, eg: 60
         * @param data describe parameter here, eg: 0
         */
    //% block
    export function lcdコマンド送信(i2caddr: number, data: number) {
        pins.i2cWriteNumber(
            i2caddr,
            data,
            NumberFormat.UInt16BE,
            false
        )
        basic.pause(10)
    }
    /**
         * i2caddrにデータを送信します
         * @param i2caddr describe parameter here, eg: 60
         * @param data describe parameter here, eg: 0
     */
    //% block
    export function lcdデータ送信(i2caddr: number, data: number) {
        pins.i2cWriteNumber(
            i2caddr,
            16384 + data,
            NumberFormat.UInt16BE,
            false
        )
        basic.pause(1)
    }

    /**
         * LCDを初期化します
         * @param i2caddr describe parameter here, eg: 60
     */
    //% block
    export function lcd初期化(i2caddr: number) {
        lcdコマンド送信(i2caddr, 1)
        basic.pause(20)
        lcdコマンド送信(i2caddr, 2)
        basic.pause(2)
        lcdコマンド送信(i2caddr, 12)
        basic.pause(2)
        lcdコマンド送信(i2caddr, 1)
        basic.pause(20)
    }

    /**
         * i2caddrに文字列を送信します
         * @param i2caddr describe parameter here, eg: 60
         * @param _str describe parameter here, eg: "HelloWorld"
     */
    //% block
    export function lcdprint(i2caddr: number, _str: string) {
        let j = 0
        let data = 0
        while (j < _str.length) {
            data = _str.charCodeAt(j)

            lcdデータ送信(i2caddr, data)
            j += 1
        }
    }

    /**
         * カーソルの移動をします
         * @param i2caddr describe parameter here, eg: 60
         * @param x describe parameter here, eg: 0
         * @param y describe parameter here, eg: 0
     */
    //% block
    export function setCursor(i2caddr: number, x: number, y: number) {
        lcdコマンド送信(i2caddr, 128 + (y * 32 + x))
    }


}
