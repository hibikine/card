<?php
/**
 * Created by PhpStorm.
 * User: 1623145
 * Date: 2018/02/01
 * Time: 22:39
 */

class SkillsModelTest extends TestCase
{
    const TEST_SKILL_ID = 12;

    public function setUp()
    {
        $this->obj = $this->newModel('SkillsModel');
    }

    public function testGetBySkillID()
    {
        $result = $this->obj->getBySkillID(self::TEST_SKILL_ID);
        $this->markTestIncomplete();
        $this->assertEquals($result, null);
    }

    public function testCreate()
    {
        $this->markTestIncomplete();
        $this->obj->create();
    }
}
