# うちの子カードゲーム

デッキ構築型カードゲーム

# TL;DR

ドミニオンみたいなカードゲーム

うちの子でカードを作って遊べる

対戦型ブラウザオンラインゲーム

# ルール(暫定)

このゲームは場にあるカードを購入して自分のデッキを作り、ゲーム終了時に最も多くのコンテンツをデッキに集めていた人が勝ちとなるゲームです。

## 場の説明

各プレイヤーには山札、手札、プレイエリア、捨て札があります。山札、手札、プレイエリア、捨て札にあるカードをまとめてプレイヤーのデッキと呼びます。プレイヤー共通で利用するものとして場札、廃棄置き場があります。山札および場札にあるカードをまとめて置いたもの(1 枚の場合も含む)を山といいます。

山札の一番上からカードを引き、手札に加えることをドローといいます。ゲーム開始時及びクリンナップフェーズ時に手札が 6 枚になるようにドローします。山札が切れた場合(山札の枚数が 0 枚になった場合)にドローが発生した場合は捨て札をシャッフルしてドローします(山札が切れた時点ではシャッフルは行いません)。捨て札がない場合はドローできず、ドロー時の効果も発揮されません。

手札にあるカードはプレイフェーズにプレイすることで効果を発揮することができます。手札は自分のものだけを見ることができ、他のプレイヤーの手札は枚数のみが公開情報とします。クリンナップフェーズ時に手札はすべて捨て札に置き、山札から 6 枚引き直します。

捨て札には使用済みのカードを表に向けて重ねておきます。また、購入フェーズで購入したばかりのカードは捨て札の一番上に置きます。クリンナップフェーズに、プレイエリアにあるカードをすべて捨て札に置いたあとに、手札をすべて捨て札に置きます。捨て札は一番上にあるカードのみが公開情報とします。

場札はキャラクターカード、コンテンツカード、クリエイトカードの 3 種類のカードの、それぞれ複数の山で構成されています。キャラクターカードの山は、異なる種類のカードの山が 8 つ、クリエイトカードは 3 つ、コンテンツカードは 3 つで構成されます。

場札のそれぞれの山の初期枚数はプレイヤー人数によって異なります。

## カードの種類

カードは大きく分けてキャラクターカード、クリエイトカード、コンテンツカードの 3 種類に分かれています。

カードの盤面には獲得コストが書かれており、このコストを獲得フェーズに支払うことでカードを獲得することができます。獲得コストが 0 のカードはコストを支払うことなく獲得することができますが、1 回の獲得フェーズで獲得可能な枚数は 1 枚までです。

### キャラクターカード

キャラクターカードは人によっては「うちの子」とも呼ばれる、オリジナルなキャラクターが描かれたカードです。それぞれのキャラクターごとに違った効果を持ちます。このカードをユーザーがデザインできるところがこのゲームの最大のポイントでもあります。それぞれの効果は一定のコストをクリエイトカードを併用して支払うことで発動することができます。中にはコストを必要としない効果も存在します。効果は 1 回のキャラクターカードのプレイにつきいずれか 1 つだけを選択して発動することができます。キャラクターカードの効果には、キャラクターカードのプレイ可能枚数を増やすものや、ゴールドを生み出すもの、購入枚数を増やすものなど、様々な効果を持っています。

### クリエイトカード

クリエイトカードはいわゆる「アイディア」や「やる気」と呼ばれるカードです。キャラクターカードと同時に使用することでコンテンツを生み出し、より強力な効果を発動することができます。ただし、強力な効果ほど多くのコストを必要とします。
1 回のキャラクターカードのプレイで複数枚のクリエイトカードを使用することが可能です。

### コンテンツカード

コンテンツカードは、創作されたコンテンツ(同人誌、CD など)を表す、最終的な勝利条件に結びつくカードです。ゲーム終了時に記載された点数がプレイヤーの得点として計算されます。得点が最も高いプレイヤーが勝利します。

## ターンの流れ

プレイヤーは時計回りに順番に各自のターンを行います。
1 つのターンはプレイフェーズ、獲得フェーズ、クリンナップフェーズの 3 つのフェーズによって成り立っており、必ずフェーズはこの順番に 1 回ずつ行われます。

### プレイフェーズ

キャラクターカードを 1 枚までプレイすることができます。プレイしたキャラクターカードはプレイエリアに表向きに置かれます。キャラクターカードをプレイするときに、任意の枚数のクリエイトカードを同時に使用する(プレイエリアに置く)、または使用しないことで、キャラクターカードに記載された効果を使用することができます。ただし、キャラクターカードに必要なクリエイトカードの数値の合計であるコストを満たしていない場合、その効果は使用できません。また、1 回のキャラクターカードのプレイにおいて効果はいずれか 1 つのみしか適用できません。キャラクタカードに効果が複数記載されている場合、先に記載されているものから効果の解決を行います。キャラクターカードの効果を使用した場合は記載されている効果はすべて行います。使用した効果のうち、一部の効果のみを使用することはできません。効果に「～できる」と記載されている場合は、行わなくてもよい効果を表し、効果の解決を行っているプレイヤーが行うかどうかを選択することができます。

### 獲得フェーズ

コスト分のゴールドを支払いカードを獲得することができます。獲得フェーズで使用するゴールドはプレイフェーズで一部のキャラクターカードの効果により獲得することができます。1 回の獲得で獲得できるカードは 1 枚のみとなります。また、複数回の獲得が可能な場合、ゴールドは各獲得でそれぞれ消費します。余ったゴールドは獲得フェーズ終了時に失われます。

#### ゴールド

ゴールドは基本的にはキャラクターカードの効果を利用して作成します。ゴールドは仮想コインのようなもので、獲得フェーズで支払うことにより支払った分のコストのカードを獲得することができます。一度支払いに利用したゴールドは失われます。

### クリンナップフェーズ

クリンナップフェーズでは次のターンに向けた準備を行います。まずプレイエリアに置かれたカードをすべて捨て札に表向きに置き、その後手札をすべて表向きに捨て札に置きます。最後に、山札から手札を 6 枚引きます。

## ゲームの終了と勝利

次の条件のいずれかを満たしたとき、ゲームが終了します。

* いずれかのコンテンツカードの山がなくなった場合。
* いずれかのクリエイトカードの山がなくなった場合。
* キャラクターカードの山が残り 3 つになった場合。

ゲーム終了後、各自のデッキに含まれるコンテンツカードの点数の合計がプレイヤーの得点となり、最も点数が高いプレイヤーが優勝となり、得点が高い人から順に順位がつきます。

## 備考

カードの効果とルールが矛盾している場合は基本的にカードの効果を優先します。

# Require

* yarn
* php
* Docker

# Install

```bash
composer install
yarn install
```

# Run

```bash
yarn docker
yarn watch
```
