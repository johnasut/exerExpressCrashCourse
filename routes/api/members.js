const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// Gets all members from the array in Members.js
router.get('/', (req, res) => res.json(members));

// Get a single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the ID of ${req.params.id}` });
    }
});

// Create a Member
router.post('/', (req, res) => {
    // res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        class: req.body.class,
        alignment: req.body.alignment
    };

    if(!newMember.name || !newMember.class) {
        return res.status(400).json({ msg: 'Please enter name and class' });
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

// Update a member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.class = updMember.class ? updMember.class : member.class;
                member.alignment = updMember.alignment ? updMember.alignment : member.alignment;
                
                res.json({ msg: 'Member updated', member });
            }
        });
    } else {
        res.status(400).json({ msg: `No member with the ID of ${req.params.id}` });
    }
});

// Delete a member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({
             msg: 'Member deleted', 
             members: members.filter(member => member.id !== parseInt(req.params.id)) 
            });
    } else {
        res.status(400).json({ msg: `No member with the ID of ${req.params.id}` });
    }
});

module.exports = router;